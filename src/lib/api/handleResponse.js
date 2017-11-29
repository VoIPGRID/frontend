import { get as getLinks } from './links';
const successCodes = [200, 201, 202, 204];

export async function handleResponse(response) {
  const { status, statusText, headers } = response;

  let data;

  if (status === 204) {
    data = {};
  } else {
    data = await response.json().catch(err => {
      console.error(err);
      return {};
    });
  }

  if (!successCodes.includes(status)) {
    data.status = status;
    const error = new Error(statusText);
    error.data = data;
    throw error;
  }

  const totalCount = headers.get('X-total-count');
  const links = headers.get('Link');

  if (totalCount || links) {
    return { data, totalCount, links: getLinks(links) };
  }

  return data;
}
