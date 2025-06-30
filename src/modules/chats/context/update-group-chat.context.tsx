import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";
import { FriendCard } from "../../friends-page/types/friend-info";
import { Control, useForm, UseFormHandleSubmit, UseFormSetValue } from "react-hook-form";

export interface IUpdateGroupChatContext {
    setSelectedFriends: (value: FriendCard[]) => void;
    selectedFriends: FriendCard[];
    setTotalSelected: (value: number) => void;
    totalSelected: number;
    avatar: string;
    setAvatar: (value: string) => void;
    handleSubmit: UseFormHandleSubmit<{ name: string }>;
    control: Control<{name: string}, any>
    setValue: UseFormSetValue<{name: string}>
}

interface IUpdateGroupChatContextProviderProps {
    children?: ReactNode;
}

const updateGroupChatContext = createContext<IUpdateGroupChatContext | null>(null);

export function useUpdateGroupChatContext() {
    const ctx = useContext(updateGroupChatContext);
    if (!ctx) throw new Error("UseUpdateGroupChatContext is not in Provider");
    return ctx;
}

export function UpdateGroupChatContextProvider({
    children,
}: IUpdateGroupChatContextProviderProps) {

    const {handleSubmit, control, setValue} = useForm<{name: string}>({
        defaultValues: {
            name: ""
        }
    })
    const [selectedFriends, setSelectedFriends] = useState<FriendCard[]>([]);
    const [totalSelected, setTotalSelected] = useState<number>(0);
    const [avatar, setAvatar] = useState<string>("");

    return <updateGroupChatContext.Provider value={{
        selectedFriends: selectedFriends,
        setSelectedFriends: setSelectedFriends,
        setAvatar: setAvatar,
        avatar: avatar,
        totalSelected: totalSelected,
        setTotalSelected: setTotalSelected,
        handleSubmit: handleSubmit,
        setValue: setValue,
        control: control
    }}>{children}</updateGroupChatContext.Provider>;
}
