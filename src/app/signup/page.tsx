"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { FaUser, FaEye, FaEyeSlash, FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { signUpSchema, type SignUpFormData } from "@/lib/signupValidation";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      emailOrPhone: "",
      password: "",
      agreeToTerms: false,
    },
  });

  const onSubmit = async (data: SignUpFormData) => {
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("Form data:", data);
      toast.success("Account created successfully!", {
        description:
          "Welcome to our platform. You can now access incredible learning tools!",
      });

      // Reset form after successful submission
      form.reset();
      router.push("/emailVerificaion");
    } catch (error) {
      toast.error("Something went wrong!", {
        description: "Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    toast.info(`${provider} login clicked`, {
      description: "Social login functionality would be implemented here.",
    });
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Dark background with text */}
      <div
        className="flex-1 flex items-center justify-center p-8"
        style={{
          backgroundImage: "linear-gradient(to right, #16156C, #080635)",
        }}
      >
        <div className="max-w-md">
          <h1 className="text-4xl font-bold text-white leading-tight">
            Confirm Your Email to Access Incredible Learning Tools!
          </h1>
        </div>
      </div>

      {/* Right side - Sign up form */}
      <div className="flex-1 bg-gray-50 flex items-center justify-center p-8">
        <div className="w-full max-w-md bg-white border-2 rounded-lg p-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Sing Up Account
            </h2>
            <p className="text-gray-600 text-sm">
              Don&apos;t haven Account?{" "}
              <span className="underline">Sing Up Free</span>
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* First Name and Last Name */}
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">
                        First Name
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="First name"
                            className="pr-10 bg-gray-100 border-gray-200"
                            {...field}
                          />
                          <FaUser className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Last Name
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="Last name"
                            className="pr-10 bg-gray-100 border-gray-200"
                            {...field}
                          />
                          <FaUser className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Email or Phone */}
              <FormField
                control={form.control}
                name="emailOrPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      E-mail or Phone
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter yor mail or phone number"
                        className="bg-gray-100 border-gray-200"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Password
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your Password"
                          className="pr-10 bg-gray-100 border-gray-200"
                          {...field}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2"
                        >
                          {showPassword ? (
                            <FaEyeSlash className="h-4 w-4 text-gray-400" />
                          ) : (
                            <FaEye className="h-4 w-4 text-gray-400" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Terms and Conditions */}
              <FormField
                control={form.control}
                name="agreeToTerms"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="cursor-pointer"
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-sm text-gray-600">
                        I agree to the{" "}
                        <Link href="#" className="underline">
                          Trams & Condition
                        </Link>
                      </FormLabel>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              {/* Login Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full cursor-pointer bg-primary-fill-primary hover:bg-slate-800 text-white py-3 rounded-md"
              >
                {isLoading ? "Creating Account..." : "Login"}
              </Button>
            </form>
          </Form>

          {/* Divider */}
          <div className="text-center text-gray-500 text-sm my-4">
            Or Sing Up with
          </div>

          {/* Social Login Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleSocialLogin("Google")}
              className="flex items-center justify-center space-x-2 py-3 bg-transparent cursor-pointer"
            >
              <FcGoogle className="w-5 h-5 text-red-500" />
              <span>Google</span>
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleSocialLogin("Facebook")}
              className="flex items-center justify-center space-x-2 py-3 bg-transparent cursor-pointer"
            >
              <FaFacebook className="w-5 h-5 text-blue-600" />
              <span>Facebook</span>
            </Button>
          </div>

          {/* Sign in link */}
          <div className="text-center text-sm text-gray-600 mt-4">
            Already I haven an account?{" "}
            <Link
              href="/signin"
              className="underline text-primary-fill-primary"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
