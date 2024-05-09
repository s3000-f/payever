import { Test, TestingModule } from '@nestjs/testing';
import { NodemailerMailServices } from './nodemailer-mail-services.service';
import { MailerService } from '@nestjs-modules/mailer';
import { User } from '../../../core';

jest.mock('@nestjs-modules/mailer', () => ({
  MailerService: jest.fn().mockImplementation(() => ({
    sendMail: jest.fn().mockResolvedValue(true),
  })),
}));

describe('NodemailerMailServices', () => {
  let mailServices: NodemailerMailServices;
  let mailerService: MailerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NodemailerMailServices, MailerService],
    }).compile();

    mailServices = module.get<NodemailerMailServices>(NodemailerMailServices);
    mailerService = module.get<MailerService>(MailerService);
  });

  describe('sendEmail', () => {
    it('should send an email with the correct parameters', async () => {
      const mockUser: User = {
        id: 1,
        email: 'john@example.com',
        firstName: 'John',
        lastName: 'Doe',
        avatarURL: 'http://example.com/avatar.jpg',
      };

      jest.spyOn(mailerService, 'sendMail').mockResolvedValue(true);

      await mailServices.sendEmail(mockUser);

      expect(mailerService.sendMail).toHaveBeenCalledWith({
        to: mockUser.email,
        subject: 'Welcome to Payever!',
        template: './confirmation',
        context: {
          name: mockUser.firstName,
        },
      });
    });
  });
  describe('sendEmail', () => {
    it('should send an email with the correct parameters', async () => {
      const mockUser: User = {
        id: 1,
        email: 'john@example.com',
        firstName: 'John',
        lastName: 'Doe',
        avatarURL: 'http://example.com/avatar.jpg',
      };

      jest.spyOn(mailerService, 'sendMail').mockResolvedValue(true);

      await mailServices.sendEmail(mockUser);

      expect(mailerService.sendMail).toHaveBeenCalledWith({
        to: mockUser.email,
        subject: 'Welcome to Payever!',
        template: './confirmation',
        context: {
          name: mockUser.firstName,
        },
      });
    });
  });
  it('should handle errors during the email sending process', async () => {
    const mockUser: User = {
      id: 1,
      email: 'john@example.com',
      firstName: 'John',
      lastName: 'Doe',
      avatarURL: 'http://example.com/avatar.jpg',
    };

    const error = new Error('Failed to send email');
    jest.spyOn(mailerService, 'sendMail').mockRejectedValue(error);

    try {
      await mailServices.sendEmail(mockUser);
    } catch (e) {
      expect(e).toBe(error);
    }
  });
});
