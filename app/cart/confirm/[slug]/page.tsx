import Confirm from "./confirm";

export default function Page({ params }: { params: { slug: string } }) {
  return (
    <section className="py-20">
      <Confirm slug={params.slug} />
    </section>
  );
}
