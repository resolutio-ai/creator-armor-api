import path from "path";
import { config } from 'dotenv'

config({
    path: path.resolve(process.cwd(), ".env"),
});

// Validate and export the required environment variables

export const MAGIC_SECRET = validateEnvVariable('MAGIC_SECRET_KEY');
export const PORT = validateEnvVariable('PORT');


// Helper function to validate environment variables
function validateEnvVariable(variableName: string) {
    const value = process.env[variableName];
    if (!value) {
        throw new Error(`Missing value for environment variable: ${variableName}`);
    }

    return value;
}