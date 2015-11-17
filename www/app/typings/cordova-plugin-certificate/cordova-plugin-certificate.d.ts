interface Plugins {
  certificates: Certificates
}

interface Certificates {
	/**
	 * Allow or disallow unsecure SSL certs
	 * 
	 * @param b Set to true for allow, false for disallow
	 */
	trustUnsecureCerts(b: boolean): void;
}