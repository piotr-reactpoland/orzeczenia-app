export const isStatusSuccess = (data: unknown) => {
  return (
    data &&
    typeof data === "object" &&
    "status" in data &&
    data.status === "success"
  );
};
