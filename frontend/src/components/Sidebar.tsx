import { Home, Settings, LogOut, Plus,Network, TestTubeDiagonal,Brain,ChartColumn ,StickyNote, UserRound, Copyright  } from "lucide-react"
import { useLocation } from "react-router"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
  SidebarHeader,
  SidebarMenuAction,
  SidebarFooter

} from "@/components/ui/sidebar"
import {Separator} from "@/components/ui/separator"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { SiThealgorithms, SiAlgorand} from "react-icons/si";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { logOut } from "@/lib/api"
import toast from "react-hot-toast"
const items = [
  {
    title: "Home",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Algorithms",
    url: "#",
    icon: SiAlgorand,
  },
  {
    title: "Data Structures",
    url: "#",
    icon: Network,
  },
  {
    title: "Test",
    url: "#",
    icon: TestTubeDiagonal,
  },
    {
    title: "Quizzes",
    url: "#",
    icon: Brain,
  },
    {
    title: "Visualizations",
    url: "#",
    icon: ChartColumn,
  },
  {
    title: "Cheat Sheets",
    url: "#",
    icon: StickyNote,
  },
  {
    title: "Profile",
    url: "#",
    icon: UserRound,
  },
]

export default function AppSidebar() {
  const {state} = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const queryClient = useQueryClient();
  const {mutate:logOutUser} = useMutation({
    mutationFn: logOut,
    onSuccess: () => {
      toast.success("Logout Successful");
      queryClient.invalidateQueries({queryKey: ["authUser"]});
    },
  })
  const handleLogout = () => {
    logOutUser();
  }
  return (
    <Sidebar collapsible="icon" variant="floating" >
      <SidebarHeader >
        <div className="flex gap-3">
          <SiThealgorithms size={30} />
          {state === 'expanded' && <h1 className="font-bold">TheAlgorithms</h1>}
        </div>
        
      </SidebarHeader>

      <SidebarContent className="">
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className={`flex flex-col ${state === 'expanded' ? 'gap-2' : 'gap-4'}`}>
              {items.map((item) => (
                <SidebarMenuItem key={item.title} className="flex flex-col items-center">
                    <SidebarMenuButton asChild isActive={currentPath === item.url}>
                      {state === 'expanded' ? (
                        <a href={item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                        </a>
                      ):(
                        <Tooltip >
                          <TooltipTrigger asChild>
                            <a>
                              <item.icon size={20} />
                            </a>
                          </TooltipTrigger>
                          <TooltipContent side="right"  >{item.title}</TooltipContent>
                        </Tooltip>
                      )
                      }
                    </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <Separator />

        <SidebarGroup>
          <SidebarGroupLabel className="font-bold">Settings</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className={`flex flex-col ${state === 'expanded' ? 'gap-2' : 'gap-4'}`}>
              <SidebarMenuItem className={`flex flex-col items-center ${state === 'expanded' ? 'gap-2' : 'gap-4'}`}>
                <SidebarMenuButton asChild isActive={currentPath === '/setting'}>
                  {state === 'expanded' ? (
                    <a href={'#'}>
                      <Settings />
                      <span>Settings</span>
                    </a>
                  ):(
                    <Tooltip >
                      <TooltipTrigger asChild>
                        <a>
                          <Settings size={20} />
                        </a>
                      </TooltipTrigger>
                      <TooltipContent side="right">Settings</TooltipContent>
                    </Tooltip>
                  )
                  }
                </SidebarMenuButton>

                <SidebarMenuAction showOnHover onClick={() => {console.log('clicked') }} >
                  <Plus /> 
                </SidebarMenuAction>

                <SidebarMenuButton asChild >
                  {state === 'expanded' ? (
                    <button onClick={handleLogout} className="cursor-pointer">
                      <LogOut />
                      <span>Logout</span>
                    </button>
                  ):(
                    <Tooltip >
                      <TooltipTrigger asChild>
                        <button className="cursor-pointer">
                          <LogOut size={20} />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent side="right"  >Logout</TooltipContent>
                    </Tooltip>
                    )
                    }
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

      </SidebarContent>
      <SidebarFooter>
        {state === 'expanded' ? 
          (          
            <div className="w-full py-4 text-xs text-center border-t text-muted-foreground">
            © {new Date().getFullYear()} TheAlgorithms. All rights reserved.
          </div>
            ):(
            <div className="flex items-center justify-center">
              <Copyright/>

            </div>
          )
        }
      </SidebarFooter>
    </Sidebar>
  )
}