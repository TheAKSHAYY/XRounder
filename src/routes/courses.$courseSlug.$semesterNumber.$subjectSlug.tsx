import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/courses/$courseSlug/$semesterNumber/$subjectSlug")({
  component: () => <Outlet />,
});
