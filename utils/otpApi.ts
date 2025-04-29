// utils/otpApi.ts

export async function verifyOtp(email: string, otp: string[]): Promise<{ success: boolean; message: string }> {
    try {
      const url = `https://notifications.sajilni-staging.events/api/otp/verify?whitelabelId=cma0o93f20000oz2510s5fjot&identifier=${encodeURIComponent(email)}&otp=${otp.join('')}`;
  
      const response = await fetch(url, {
        method: 'GET',
        headers: { 'Accept-Language': 'ar' },
      });
  
      const responseText = await response.text();
      console.log('Verify OTP Raw Response:', responseText);
  
      if (response.ok) {
        return { success: true, message: responseText || 'OTP verified successfuly.' };
      } else {
        return { success: false, message: responseText || 'Verifcation failed.' };
      }
    } catch (error) {
      console.error('Verify OTP Network Error:', error);
      return { success: false, message: 'Network error. Please try again.' };
    }
  }
  




  export async function resendOtp(email: string): Promise<{ success: boolean; message: string }> {
    try {
      const url = `https://notifications.sajilni-staging.events/api/otp/send?whitelabelId=cma0o93f20000oz2510s5fjot&identifier=${encodeURIComponent(email)}`;
  
      const response = await fetch(url, {
        method: 'GET',
        headers: { 'Accept-Language': 'ar' },
      });
  
      const responseText = await response.text();
      console.log('Resend OTP Raw Response:', responseText);
  
      if (response.ok) {
        return { success: true, message: responseText || 'OTP resent succe  sfully.' };
      } else {
        return { success: false, message: responseText || 'Failed to resend OTP.' };
      }
    } catch (error) {
      console.error('Resend OTP Network Error:', error);
      return { success: false, message: 'Network error. Please try again.' };
    }
  }
  