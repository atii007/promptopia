"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

import Profile from "@components/Profile";

const UserProfile = ({ params }) => {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const userName = searchParams.get("name");
  const router = useRouter();

  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params?.id}/posts`);
      const data = await response.json();

      setUserPosts(data);
    };

    if (params.id) {
      fetchPosts();
    }
  }, [params.id]);

  return (
    <Profile
      name={userName.toUpperCase()}
      desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s professional prompts and be inspired by the power of his imagination`}
      data={userPosts}
    />
  );
};

export default UserProfile;
