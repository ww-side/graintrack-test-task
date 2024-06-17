import { beforeEach, describe, expect, it } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import App from '@/app/components/app.tsx';

describe('Routers test case', () => {
  beforeEach(() => {
    document.cookie = 'token=test-token';
  });

  it('test routers', async () => {
    const { getByTestId } = render(<App />);
    await waitFor(() => expect(getByTestId('home-page')).toBeInTheDocument());

    const aboutPageBtn = getByTestId('about-page-btn');
    await waitFor(() => expect(aboutPageBtn).toBeInTheDocument());

    await userEvent.click(aboutPageBtn);
    await waitFor(() => expect(getByTestId('about-page')).toBeInTheDocument());
  });
});
