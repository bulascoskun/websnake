import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const AddDomain = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Domain</CardTitle>
        <CardDescription>Card Description</CardDescription>
        <CardAction>Card Action</CardAction>
      </CardHeader>

      <CardContent>
        <p>Card Content</p>
      </CardContent>

      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  );
};
export default AddDomain;
