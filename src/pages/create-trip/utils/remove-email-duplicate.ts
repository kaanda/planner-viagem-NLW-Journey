export function removeEmailFromInvite(
        emailToRemove: string, 
        emailsToInvite: string[], 
        setEmailsToInvite: (emails: string[]) => void 
    ) {
    const newEmailList = emailsToInvite.filter(email => email !== emailToRemove);
    setEmailsToInvite(newEmailList);
}