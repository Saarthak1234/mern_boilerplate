import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"

export function OTPForm({
  className,
  ...props
}) {
  return (
    // Note: 'w-2/7' is not a standard Tailwind class. You might want 'w-[28%]' or 'w-1/3'
    <div className={cn("flex flex-col gap-6 w-2/7", className)} {...props}>
      <Card className="shadow-none border-none">
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Enter verification code</CardTitle>
        <CardDescription>We sent a 6-digit code to your email.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="otp" className="sr-only">
                Verification code
              </FieldLabel>
              <InputOTP maxLength={6} id="otp" required>
                {/* Added 'flex w-full justify-center' to center the slots */}
                <InputOTPGroup
                  className="flex w-full justify-center gap-2.5 *:data-[slot=input-otp-slot]:rounded-md *:data-[slot=input-otp-slot]:border">
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
              <FieldDescription className="text-center">
                Enter the 6-digit code sent to your email.
              </FieldDescription>
            </Field>
            <Button className="mx-auto block px-12" type="submit">Verify</Button>
            <FieldDescription className="text-center">
              Didn&apos;t receive the code? <a href="#">Resend</a>
            </FieldDescription>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
    </div>
  );
}