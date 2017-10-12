export const UPDATE_BRANDING = 'UPDATE_BRANDING';

export function updateBranding(branding) {
  return {
    type: UPDATE_BRANDING,
    payload: {
      primary: branding.brand,
      secondary: branding.text
    }
  };
}
