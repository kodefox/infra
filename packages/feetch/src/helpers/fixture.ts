import { Fixture } from '../types/Fixture';

function findFixtures(
  endpoint: string,
  method: string,
  fixtures: Array<Fixture>,
): Fixture | null {
  return (
    fixtures.find((fixture) => {
      if (fixture.endpoint === endpoint && fixture.method === method) {
        return true;
      }
      return false;
    }) || null
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function generateResponseFromFixture(body: any): Response {
  let headers = new Headers();
  headers.append('Content-Type', 'json');
  let init = { status: 200, statusText: 'OK', headers };
  return new Response(JSON.stringify(body), init);
}

export { findFixtures, generateResponseFromFixture };
