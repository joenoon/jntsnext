import * as DB from '../../server/db';
import { Mutation } from '../../server/schema/types/Mutation';

describe('auth', () => {
  describe('requestCode', () => {
    let requestCodeRes;
    beforeAll(async () => {
      requestCodeRes = await Mutation.requestCode({}, { input: { email: 'test@test.com' } }, {}, {} as any);
    });
    it('should work', async () => {
      expect(requestCodeRes).toHaveProperty('code_token');
      expect(requestCodeRes.code_token).toBeTruthy();
    });

    describe('requestToken', () => {
      let requestTokenRes;
      beforeAll(async () => {
        const { code_token } = requestCodeRes;
        const email_verification = await DB.EmailVerification.findById(code_token);
        requestTokenRes = await Mutation.requestToken({}, { input: { code_token, code: email_verification.code } }, {}, {} as any);
      });
      it('should work', async () => {
        expect(requestTokenRes).toHaveProperty('auth_token');
        expect(requestTokenRes.auth_token).toBeTruthy();
      });

      describe('loginWithToken', () => {
        let loginWithTokenRes;
        beforeAll(async () => {
          const { auth_token } = requestTokenRes;
          loginWithTokenRes = await Mutation.loginWithToken({}, { input: { auth_token } }, {}, {} as any);
        });
        it('should work', async () => {
          expect(loginWithTokenRes).toHaveProperty('viewer');
          expect(loginWithTokenRes.viewer).toBeTruthy();
        });
      });
    });
  });
});
