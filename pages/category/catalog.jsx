import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
// import component
import CatalogHeader from "../../components/catalog/catalog_header";
import CatalogCategory from "../../components/catalog/catalog_category";
import Footer from "../../components/footer";


const Catalog = () => {
	
	const router = useRouter();
  const { status, data : session } = useSession();
	
	useEffect(() => {
      if (status === "unauthenticated") {
        router.push("/auth/signIn");
      } else if (status === "authenticated") {
          console.log("Hoorraayyyyy")
      }
    }, [status]);
	return (
			<div>
				<CatalogHeader />
				<CatalogCategory />
				<Footer />
			</div>
	)
}

export default Catalog