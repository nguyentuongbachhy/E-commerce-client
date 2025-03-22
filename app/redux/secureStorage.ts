import CryptoJS from 'crypto-js';

const { AES, SHA256 } = CryptoJS
class SecureStorage {
    private secretKey: string;

    constructor(secretKey: string) {
        this.secretKey = secretKey
    }

    setItem(key: string, data: any): void {
        try {
            const dataStr = typeof data === 'object' ? JSON.stringify(data) : String(data)

            const encryptedData = AES.encrypt(dataStr, this.secretKey).toString()

            localStorage.setItem(key, encryptedData)

        } catch (error) {
            console.error('Error encrypting and save data to localStorage:', error)
        }
    }

    getItem<T>(key: string, defaultValue: T | null = null): T | null {
        try {
            const encryptedData = localStorage.getItem(key)

            if (!encryptedData) {
                return defaultValue
            }

            const bytes = AES.decrypt(encryptedData, this.secretKey)
            const decryptedData = bytes.toString(CryptoJS.enc.Utf8)

            if (!decryptedData) {
                return defaultValue
            }

            try {
                return JSON.parse(decryptedData) as T
            } catch (error) {
                return defaultValue as unknown as T
            }

        } catch (error) {
            console.error('Error getting and decrypting data:', error)
            return defaultValue
        }
    }

    removeItem(key: string): void {
        localStorage.removeItem(key)
    }

    clear(): void {
        localStorage.clear()
    }
}

export const generateSecretKey = (userId: string, appSecret: string): string => {
    return SHA256(`${userId}:${appSecret}:${navigator.userAgent}`).toString()
}

export const createSecureStorage = (secretKey: string): SecureStorage => {
    return new SecureStorage(secretKey)
}

export default SecureStorage