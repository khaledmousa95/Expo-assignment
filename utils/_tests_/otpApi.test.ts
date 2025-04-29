import { verifyOtp, resendOtp } from '../otpApi';

global.fetch = jest.fn();

// Clearing mocks before each test.
beforeEach(() => {
  (fetch as jest.Mock).mockClear();
});

describe('otpApi', () => {
  it('should verify OTP successfully', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      text: async () => 'OTP Verified Successfully',
    });

    const { success, message } = await verifyOtp('test@example.com', ['1', '2', '3', '4']);

    expect(success).toBe(true);
    expect(message).toBe('OTP Verified Successfully');
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('should fail OTP verification', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      text: async () => 'Invalid OTP',
    });

    const { success, message } = await verifyOtp('test@example.com', ['1', '2', '3', '4']);

    expect(success).toBe(false);
    expect(message).toBe('Invalid OTP');
  });

  it('should resend OTP successfully', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      text: async () => 'OTP Sent',
    });

    const { success, message } = await resendOtp('test@example.com');

    expect(success).toBe(true);
    expect(message).toBe('OTP Sent');
  });

  it('should handle resend OTP failure', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      text: async () => 'Failed to resend',
    });

    const { success, message } = await resendOtp('test@example.com');

    expect(success).toBe(false);
    expect(message).toBe('Failed to resend');
  });
});
