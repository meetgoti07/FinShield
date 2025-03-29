"use client"

import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { signIn } from "next-auth/react"
import { Separator } from "@/components/ui/separator"

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
})

export function LoginForm() {
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" }
  })

  const handleCredentialsLogin = async (values: z.infer<typeof formSchema>) => {
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password
      })

      if (result?.error) {
        toast({ title: "Authentication failed", description: result.error, variant: "destructive" })
        return
      }

      router.push("/dashboard")
      router.refresh()
    } catch (error) {
      toast({ title: "Error", description: "An unexpected error occurred", variant: "destructive" })
    }
  }

  const handleGoogleLogin = async () => {
    try {
      await signIn("google", {
        callbackUrl: `${window.location.origin}/dashboard`,
        redirect: true
      })
    } catch (error) {
      toast({ title: "Google Login Failed", description: error.message, variant: "destructive" })
    }
  }

  return (
      <div className="grid gap-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleCredentialsLogin)} className="space-y-4">
            {/* Keep existing form fields */}
            <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="name@example.com" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input {...field} type="password" placeholder="••••••••" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                )}
            />
            <Button type="submit" className="w-full">
              Sign in
            </Button>
          </form>
        </Form>

        <Separator />

        <Button
            variant="outline"
            onClick={handleGoogleLogin}
            className="flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24">
            <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z"/>
          </svg>
          Continue with Google
        </Button>
      </div>
  )
}
