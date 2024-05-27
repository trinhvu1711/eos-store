import { PageProps } from "@/lib/type";

function Layout({ children, params }: PageProps) {
    return ( 
        <section>
            {children}
        </section>
     );
}

export default Layout;