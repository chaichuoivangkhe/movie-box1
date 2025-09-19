import React from 'react';
import { RedirectToSignIn, useUser } from '@clerk/clerk-react';

function ProtectedRoute({ children }) {
    const { isSignedIn } = useUser();
    if (!isSignedIn) {
        // Nếu chưa đăng nhập, chuyển hướng về trang đăng nhập Clerk
        return <RedirectToSignIn />;
    }

    // Nếu đã đăng nhập, cho phép truy cập
    return children;
}

export default ProtectedRoute;