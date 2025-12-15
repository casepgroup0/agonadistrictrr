import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { AboutSection } from "@/components/home/AboutSection";
import { MissionSection } from "@/components/home/MissionSection";
import { AgeGroupsSection } from "@/components/home/AgeGroupsSection";
import { CTASection } from "@/components/home/CTASection";
import { Helmet } from "react-helmet-async";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Royal Rangers Agona District | Building Champions for Life</title>
        <meta
          name="description"
          content="Royal Rangers Agona District empowers young men and boys to become Christlike servant leaders through adventure, mentoring, and spiritual growth in Ghana's Central Region."
        />
      </Helmet>
      <Layout>
        <HeroSection />
        <AboutSection />
        <MissionSection />
        <AgeGroupsSection />
        <CTASection />
      </Layout>
    </>
  );
};

export default Index;
