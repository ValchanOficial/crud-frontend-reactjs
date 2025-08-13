function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={
        "bg-card text-card-foreground flex flex-col rounded-xl border py-6 shadow-sm w-full" +
        (className ? ` ${className}` : "")
      }
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6" +
        (className ? ` ${className}` : "")
      }
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={"leading-none font-semibold" + (className ? ` ${className}` : "")}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={"text-muted-foreground text-sm" + (className ? ` ${className}` : "")}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end" + (className ? ` ${className}` : "")
      }
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={"px-6" + (className ? ` ${className}` : "")}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={"flex items-center px-6 [.border-t]:pt-6" + (className ? ` ${className}` : "")}
      {...props}
    />
  )
}

export {
  Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle
}

