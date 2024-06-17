import { describe, expect, it, beforeEach } from 'vitest';
import { waitFor } from '@testing-library/react';
import { renderWithContext } from '@/core/utils/testing-router.tsx';
import { userEvent } from '@testing-library/user-event';

describe('Routers test case', () => {
  beforeEach(() => {
    document.cookie = 'token=test-token';
  });

  it('test routers', async () => {
    const { getByTestId } = renderWithContext();
    await waitFor(() => expect(getByTestId('home-page')).toBeInTheDocument());

    const aboutPageBtn = getByTestId('about-page-btn');
    await waitFor(() => expect(aboutPageBtn).toBeInTheDocument());

    await userEvent.click(aboutPageBtn);
    await waitFor(() => expect(getByTestId('about-page')).toBeInTheDocument());
  });
});
