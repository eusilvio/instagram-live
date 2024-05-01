import { useState, useCallback, useEffect } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";

import videoLive from "@/assets/videoLive.mp4";

import {
  BadgeCheck,
  ChevronDown,
  Ellipsis,
  Eye,
  Heart,
  MessageCircleQuestion,
  Plus,
  Send,
  Video,
  X,
} from "lucide-react";
import { Likes } from "./components/like";
import { random } from "./lib/utils";

const commentsContent = [
  "They're so in sync! 💞",
  "This is what true love looks like! ❤️",
  "Their chemistry is amazing! 🔥",
  "I wish I could dance like them! 💃🕺",
  "Goals! 💖",
  "So romantic! 😍",
  "They're perfect together! 💑",
  "This made my day! 🌟",
  "Love is in the air! 💕",
  "Wow, just wow! 🤩",
  "Their moves are mesmerizing! ✨",
  "I can feel the love! 🥰",
  "Relationship goals! 👫",
  "I'm in tears, this is beautiful! 😭",
  "Their dance tells a story! 📖",
  "I can't stop watching! 🤳",
  "Made for each other! 👩‍❤️‍👨",
  "Pure magic! ✨",
  "I'm swooning! 😊",
  "This is the cutest thing ever! 🥺",
  "Their energy is infectious! 🌈",
  "Just like a fairytale! 🏰",
  "I believe in love again! 💫",
  "Dancing into each other's hearts! 💞",
  "My heart can't handle this! 💓",
  "They're dancing on clouds! ☁️",
  "So graceful! 🌹",
  "My favorite couple! 🌟",
  "They're glowing! 🌟",
  "This is what happiness looks like! 😄",
  "They're stealing the show! 🌟",
  "Soulmates! 👩‍❤️‍💋‍👨",
  "I want a love like theirs! 💘",
  "Can't get enough of this! 🔄",
  "Just magical! 🎩✨",
  "My heart is melting! 💗",
  "They're dancing into eternity! 🌌",
  "I'm smiling from ear to ear! 😃",
  "Absolutely enchanting! 🧚‍♂️",
  "I'm rooting for them! 🎉",
  "So much passion! 🔥",
  "Dancing into forever! 💫",
  "I'm on cloud nine watching this! ☁️",
  "They're making my heart skip a beat! 💓",
  "Never stop dancing, you two! 💃🕺",
  "This is what dreams are made of! 💭",
  "Incredible chemistry! ⚗️",
  "I'm speechless! 🤐",
  "Can't help but smile! 😊",
  "This is everything! 🙌",
];

type Comment = {
  login: {
    uuid: string;
    username: string;
    verified: boolean;
  };
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  content: string;
};

export function App() {
  const [comments, setComments] = useState<Comment[]>([]);

  const fetchComments = useCallback(async () => {
    const request = await fetch("https://randomuser.me/api/?inc=login,picture");
    const response = await request.json();
    if (request.ok) {
      const [user] = response.results;
      const randomIndex = Math.floor(random(1, commentsContent.length));
      user.login.verified = randomIndex % 5 === 0;
      setComments((oldComments) => [
        ...oldComments,
        { ...user, content: commentsContent[randomIndex] },
      ]);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(fetchComments, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const qtyToRemove = Math.floor(random(1, 10));
    if (comments.length > 10 && qtyToRemove < 10) {
      setComments([...comments.splice(0, qtyToRemove)]);
    }
  }, [comments]);

  const usersWatching = Math.floor(random(1, 1000));

  return (
    <div className="flex items-center justify-center bg-zinc-800 sm:h-screen sm:p-8">
      <div className="relative overflow-hidden flex flex-col justify-between bg-zinc-500 p-4 sm:rounded-sm sm:w-[360px] w-full h-screen sm:h-full shadow-sm shadow-black">
        <video
          src={
            "https://videos.pexels.com/video-files/6262593/6262593-uhd_2160_4096_25fps.mp4"
          }
          autoPlay
          muted
          loop
          controls={false}
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
        <header className="z-10 flex justify-between items-center">
          <div className="flex items-center gap-1">
            <span className="text-sm text-white">Love ❤️</span>
            <ChevronDown className="text-white" />
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-r from-[#833ab4] to-[#fd1d1d] rounded-sm p-1 px-2 text-white  text-xs">
              <span>Live</span>
            </div>
            <div className="flex h-full items-center gap-1 bg-black/50 p-1 px-2 rounded-sm text-white">
              <Eye size={12} />
              <span className="text-xs">{usersWatching}</span>
            </div>
            <button>
              <Ellipsis className="text-white" />
            </button>
            <button className="text-white text-sm">
              <X />
            </button>
          </div>
        </header>
        <footer className="z-10">
          <ScrollArea className="h-40 mb-4 z-10">
            <div className="flex flex-col gap-4">
              {comments.map((comment, index) => (
                <div
                  key={index}
                  className="flex items-center justify-start gap-2"
                >
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={comment.picture.medium} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col gap-0">
                    <div className="flex items-center gap-1">
                      <span className="text-white font-bold text-xs">
                        {comment.login.username}
                      </span>
                      {comment.login.verified && (
                        <span>
                          <BadgeCheck fill="#405DE6" size={12} color="#fff" />
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-white/80">
                      {comment.content}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          <div className="flex flex-items  gap-4">
            <Input
              className="border rounded-full placeholder:text-white/50 text-white p-5"
              placeholder="Add a comment"
            />
            <button className="text-white">
              <Video />
            </button>
            <button className="text-white">
              <MessageCircleQuestion />
            </button>
            <button className="text-white">
              <Send />
            </button>
            <button className="text-white">
              <Heart />
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}
