import MemberNavigator from "@/components/layout/MemberNavigator";
import { PageProps } from "@/lib/type";
// import MemberNavigator from "@/ui/Include/MemberNavigator";

function Layout({ children, params }: PageProps) {
  return (
    <section>
      <div className="mx-4 max-w-7xl md:pb-20 md:pt-10 lg:mx-auto">
        <div className="grid grid-cols-1 gap-x-4 lg:grid-cols-5">
          <div className="hidden md:col-span-1 lg:block">
            <MemberNavigator />
          </div>
          <div className="lg:col-span-4">{children}</div>
        </div>
      </div>
    </section>
  );
}

export default Layout;
