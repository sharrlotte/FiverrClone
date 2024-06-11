'use client';

import { getPostCategory } from '@/api/post-category.api';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from '@/components/ui/navigation-menu';
import env from '@/constant/env';
import { cn } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

const ListItem = React.forwardRef<React.ElementRef<'a'>, React.ComponentPropsWithoutRef<'a'>>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a ref={ref} className={cn('block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground', className)} {...props}>
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});

ListItem.displayName = 'ListItem';
export default function Navigation() {
  const { data } = useQuery({
    queryKey: ['post-category'],
    queryFn: () => getPostCategory({ size: 20, page: 1, isParent: true }),
  });

  return (
    <NavigationMenu className="w-full shadow-sm">
      <NavigationMenuList className="gap-7">
        {data?.map((parent, index) => (
          <NavigationMenuItem key={parent.id}>
            <NavigationMenuTrigger>{parent.name}</NavigationMenuTrigger>
            <NavigationMenuContent
              className={cn({
                'right-0 shadow-mdp': index > data.length / 2,
              })}
            >
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]  bg-white rounded-sm shadow-2xl">
                {parent.children.map((child) => (
                  <ListItem key={child.id} title={child.name} href={`${env.url.base}/${child.name}`}>
                    {/* Add image here */}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
