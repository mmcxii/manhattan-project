export const isAdmin = (admin: string): boolean => {

    if (admin !== 'aVeryLongStringPlaceholder') {
        return false;
    } else {
        return true;
    }
}