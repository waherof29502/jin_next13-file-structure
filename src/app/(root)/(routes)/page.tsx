import FormWithReactHookForm from '@/components/forms/form-with-react-hook-form';
import FormWithReactHookFormAndZodAndServer from '@/components/forms/form-with-rhf-and-zod-and-server';
import FormWithoutReactHookForm from '@/components/forms/form-without-react-hook-form';
import { Shell } from '@/components/shells/shell';

export default async function IndexPage() {
  return (
    <Shell className="gap-12">
      <section
        id="hero"
        aria-labelledby="hero-heading"
        className="mx-auto flex w-full max-w-[64rem] flex-col items-center justify-center gap-4 pb-8 pt-6 text-center md:pb-12 md:pt-10 lg:py-28"
      >
        <FormWithReactHookFormAndZodAndServer />
      </section>
    </Shell>
  );
}
