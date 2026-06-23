import StatCard from "@/components/StatCard";
import SectionLabel from "@/components/SectionLabel";
import GrowthChart from "@/components/charts/GrowthChart";
import { socialSummary } from "@/data/sampleData";

export default function SocialMediaPage() {
  return (
    <div className="space-y-10">
      <section>
        <SectionLabel tag="02.1" title="Social Performance" />
        <div className="grid grid-cols-3 gap-4">
          <StatCard
            tag="INSTAGRAM"
            label="Views (30d)"
            value={socialSummary.instagramViews.toLocaleString()}
          />
          <StatCard
            tag="INSTAGRAM"
            label="Followers"
            value={socialSummary.instagramFollowers.toLocaleString()}
            sub={`+${socialSummary.followerGrowthThisWeek}% this week`}
            accent
          />
          <StatCard
            tag="TIKTOK"
            label="Views (30d)"
            value={socialSummary.tiktokViews.toLocaleString()}
          />
          <StatCard
            tag="WEBSITE"
            label="Visits (30d)"
            value={socialSummary.websiteVisits.toLocaleString()}
          />
          <StatCard
            tag="ENGAGEMENT"
            label="Avg. Engagement Rate"
            value={`${socialSummary.engagementRate}%`}
          />
          <StatCard
            tag="GROWTH"
            label="Follower Growth"
            value={`+${socialSummary.followerGrowthThisWeek}%`}
            sub="Week over week"
          />
        </div>
      </section>

      <section className="card p-6 shadow-card">
        <SectionLabel tag="02.2" title="Weekly Growth Chart" />
        <GrowthChart />
      </section>
    </div>
  );
}
