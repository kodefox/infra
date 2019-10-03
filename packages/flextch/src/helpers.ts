import { Fixture } from './type';

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
  let blob = new Blob([JSON.stringify(body)], {
    type: 'application/json',
  });
  let init = { status: 200, statusText: 'OK' };
  return new Response(blob, init);
}

export { findFixtures, generateResponseFromFixture };
