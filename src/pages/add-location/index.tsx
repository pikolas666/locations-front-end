// pages/add-location.tsx

import Head from "next/head";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import axios from "axios";
import cookie from "js-cookie";
import { useRouter } from "next/router";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import styles from "./styles.module.css";
import Button from "@/components/button/Button";
import Message from "@/components/message/Message";
import PageTemplate from "@/components/pageTemplate/PageTemplate";

interface FormData {
	title: string;
	description: string;
	latitude: string;
	longitude: string;
	location_photo_url: string;
}

const AddLocation: React.FC = () => {
	const [formData, setFormData] = useState<FormData>({
		title: "",
		description: "",
		latitude: "",
		longitude: "",
		location_photo_url: "",
	});

	const [formErrors, setFormErrors] = useState<Record<string, string>>({});
	const [message, setMessage] = useState<{
		type: "success" | "error";
		text: string;
	} | null>(null);

	const router = useRouter();

	const headers = cookie.get("jwt_token");

	const checkIfLogged = () => {
		if (!headers) {
			router.push("/login");
		}
	};
	useEffect(() => {
		checkIfLogged();
		console.log(headers);
	}, []);

	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});

		// Clear the specific field error when the user starts typing
		setFormErrors({
			...formErrors,
			[e.target.name]: "",
		});
	};

	const validateForm = () => {
		const errors: Record<string, string> = {};

		// Example: Validate title
		if (!formData.title.trim()) {
			errors.title = "Title is required";
		}

		// Example: Validate description
		if (!formData.description.trim()) {
			errors.description = "Description is required";
		}

		// Example: Validate latitude
		if (!formData.latitude.trim() || isNaN(parseFloat(formData.latitude))) {
			errors.latitude = "Latitude must be a valid number";
		}

		// Example: Validate longitude
		if (!formData.longitude.trim() || isNaN(parseFloat(formData.longitude))) {
			errors.longitude = "Longitude must be a valid number";
		}

		// Example: Validate location_photo_url as a URL
		const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
		if (!urlRegex.test(formData.location_photo_url.trim())) {
			errors.location_photo_url = "Invalid image URL";
		}

		setFormErrors(errors);

		// Return true if there are no errors
		return Object.keys(errors).length === 0;
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();

		if (!validateForm()) {
			// Stop form submission if there are validation errors
			return;
		}

		try {
			const headers = {
				authorization: cookie.get("jwt_token"),
			};
			if (!headers) {
				router.push("/login");
			}

			const response = await axios.post(
				`${process.env.SERVER_URL}/locations`,
				formData,
				{
					headers,
				}
			);

			setMessage({ type: "success", text: "Location added successfully!" });

			// Redirect to the home page or the newly created location page
			router.push("/");
		} catch (error) {
			console.error("Error adding location:", error);
			setMessage({
				type: "error",
				text: "Error adding location. Please try again.",
			});
		}
	};

	return (
		<PageTemplate>
			<Head>
				<title>Add Location</title>
			</Head>
			<main className={styles.main}>
				<h1 className={styles.h1}>Add Location</h1>

				{message && <Message type={message.type} text={message.text} />}

				<form className={styles.form} onSubmit={handleSubmit}>
					<label className={styles.label}>
						Title:
						<input
							className={styles.input}
							type="text"
							name="title"
							value={formData.title}
							onChange={handleChange}
						/>
						{formErrors.title && (
							<span className={styles.error}>{formErrors.title}</span>
						)}
					</label>

					<label className={styles.label}>
						Description:
						<textarea
							className={styles.textarea}
							name="description"
							value={formData.description}
							onChange={handleChange}
						/>
						{formErrors.description && (
							<span className={styles.error}>{formErrors.description}</span>
						)}
					</label>

					<label className={styles.label}>
						Latitude:
						<input
							className={styles.input}
							type="text"
							name="latitude"
							value={formData.latitude}
							onChange={handleChange}
						/>
						{formErrors.latitude && (
							<span className={styles.error}>{formErrors.latitude}</span>
						)}
					</label>

					<label className={styles.label}>
						Longitude:
						<input
							className={styles.input}
							type="text"
							name="longitude"
							value={formData.longitude}
							onChange={handleChange}
						/>
						{formErrors.longitude && (
							<span className={styles.error}>{formErrors.longitude}</span>
						)}
					</label>

					<label className={styles.label}>
						Image URL:
						<input
							className={styles.input}
							type="text"
							name="location_photo_url"
							value={formData.location_photo_url}
							onChange={handleChange}
						/>
						{formErrors.location_photo_url && (
							<span className={styles.error}>
								{formErrors.location_photo_url}
							</span>
						)}
					</label>

					<Button className={styles.button} text="add new location" />
				</form>
			</main>
		</PageTemplate>
	);
};

export default AddLocation;
