import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let authController: AuthController;

  const mockAuthService = {
    registerUser: jest.fn((dto) => {
      return {
        id: Date.now(),
        email: dto.email,
        password: dto.password,
        activation: false,
      };
    }),
  };
  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    })
      .overrideProvider(AuthService)
      .useValue(mockAuthService)
      .compile();

    authController = moduleRef.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  it('should register a user', () => {
    expect(
      authController.register({
        email: 'supertest@gmail.com',
        password: 'superpwd',
      }),
    ).toEqual({
      id: expect.any(Number),
      email: expect.any(String),
      password: expect.any(String),
      activation: expect.any(Boolean),
    });
  });

  it('should login a user', () => {
    expect(
      authController.login({
        email: 'supertest@gmail.com',
        password: 'superpwd',
      }),
    ).toEqual({
      accessToken: expect.objectContaining(String),
    });
  });

  it('should activate a user', () => {
    expect(
      authController.activateAccount({
        id: 'UUID',
        code: 'UUID',
      }),
    ).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        email: expect.any(String),
        activation: expect.any(Boolean),
      }),
    );
  });
});
