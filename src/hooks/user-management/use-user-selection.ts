
import { useState } from "react";

export const useUserSelection = () => {
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  return { selectedUsers, setSelectedUsers };
};
