import RecentDomainsTable from '@/components/RecentDomainsTable';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const Home = () => {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Web Intelligence Dashboard</CardTitle>
          <CardDescription>
            Crawled domains and AI-extracted insights
          </CardDescription>
        </CardHeader>

        <CardContent>
          <p>TODO:</p>
        </CardContent>
      </Card>

      <div className="mt-4 lg:mt-6 grid grid-cols-12 gap-4 lg:gap-6">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Total Domains</CardTitle>
            <CardDescription> 12 </CardDescription>
          </CardHeader>
        </Card>

        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Last crawl</CardTitle>
            <CardDescription> 2h ago </CardDescription>
          </CardHeader>
        </Card>

        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Avg confidence</CardTitle>
            <CardDescription> 0.78 </CardDescription>
          </CardHeader>
        </Card>
      </div>

      <Card className="mt-4 lg:mt-6">
        <CardHeader>
          <CardTitle>Recent Domains</CardTitle>
          <Separator />
          <RecentDomainsTable />
        </CardHeader>
      </Card>
    </>
  );
};
export default Home;
