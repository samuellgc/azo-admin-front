"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
	const navigation = useRouter();

	useEffect(() => {
		// Redireciona para a página de login
		navigation.push("/login");
	}, [navigation]);

	return null;
}
