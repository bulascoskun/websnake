import { DomainsTable } from '@/components/DomainsTable';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const Domains = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Domains</CardTitle>
        <CardDescription>
          Here you can view the domains you've crawled, or add domains to crawl
          using the button on the side.
        </CardDescription>
        <CardAction>
          <Button>Add Domain</Button>
        </CardAction>
      </CardHeader>

      <CardContent>
        <DomainsTable />
      </CardContent>
    </Card>
  );
};
export default Domains;
