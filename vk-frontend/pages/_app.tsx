import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { AppProps } from 'next/app';

import { AuthProvider } from '@/providers/AuthProvider';

import '../styles/globals.css';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false
		}
	}
});

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
				<Component {...pageProps} />
			</AuthProvider>
		</QueryClientProvider>
	);
}

export default MyApp;
