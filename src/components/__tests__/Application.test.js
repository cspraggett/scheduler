import React from "react";


import { render, cleanup, waitForElement } from "@testing-library/react";

import Application from "components/Application";
import axios from "__mocks__/axios";
import { fireEvent } from "@testing-library/react/dist";

afterEach(cleanup);

it("defaults to Monday and changes the schedule when a new day is selected", async () => {
  const { getByText } = render(<Application />);

  await waitForElement(() => getByText("Monday"));

  fireEvent.click(getByText("Tuesday"));

  expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });
