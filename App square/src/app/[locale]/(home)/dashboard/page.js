"use client"
import { useEffect } from 'react';
import { useRouter } from "@/i18n/routing";
import Cookies from 'js-cookie';

const Dashboard = () => {
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get('token');

    if (!token) {
      router.push('/login');
    }
  }, [router]);

  return (
    <div>
      <p>Redirecting to login...</p>
    </div>
  );
};

export default Dashboard;
