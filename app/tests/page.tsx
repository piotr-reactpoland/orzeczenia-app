import DisplayResults from "@/components/display-results/index";
import TestSearch from "@/components/test-search-form/index";

const Tests = () => {
  return (
    <section style={{ width: "100%" }}>
      <TestSearch />
      <DisplayResults />
    </section>
  );
};

export default Tests;
