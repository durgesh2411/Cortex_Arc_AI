"use client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { LoadingState } from "@/components/loading-state";
import { ErrorState } from "@/components/error-state";


export const AgentsView = () => {
   const {trpc} = useTRPC();
   const [data] = trpc.agents.getMany.useSuspenseQuery();

   return(
      <div>
         {JSON.stringify(data, null, 2)}
      </div>
   )
}

export const AgentsViewLoading = () => {
   return(
      <LoadingState
         title="Loading Agents"
         description="Please wait till we load your agents!!"
      />
   );
}

export const AgentsViewError = () => {
   return(
      <ErrorState
      title="Error has occured"
      description="please try again later!!"
      />
   );
}
