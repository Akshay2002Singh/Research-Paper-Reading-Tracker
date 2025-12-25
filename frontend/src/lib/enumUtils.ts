/**
 * Convert enum keys to user-friendly display names
 * Example: "Computer_Science" -> "Computer Science"
 */
export const enumToDisplay = (value: string): string => {
    return value.replace(/_/g, ' ');
};
