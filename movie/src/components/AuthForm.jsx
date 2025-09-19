import React from "react";
import { SignIn } from '@clerk/clerk-react';

const AuthForm = () => {
    return <SignIn path="/sign-in" routing="path" />;
};

export default AuthForm;