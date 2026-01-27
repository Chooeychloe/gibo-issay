import {
  Heart,
  Users,
  Crown,
  Flame,
  Eye,
  Link,
  BookOpen,
  Coins,
  LucideGem,
  Sparkles,
  Star,
  LucideChessQueen,
  LucideChessKing,
} from "lucide-react";

export default function Entourage() {
  const sections = [
    {
      title: "The Bride & Groom",
      icon: <Heart className="w-6 h-6 text-pink-600" />,
      members: [
        { name: "Gilbert Magano", role: "Groom" },
        { name: "Clarissa V. Rostrollo", role: "Bride" },
      ],
    },
    {
      title: "Parents of the Groom",
      icon: <Users className="w-6 h-6 text-indigo-700" />,
      members: [{ name: "Gaspar M. Magano" }, { name: "Berlinda E. Magano" }],
    },
    {
      title: "Parents of the Bride",
      icon: <Users className="w-6 h-6 text-indigo-700" />,
      members: [
        { name: "Jose B. Rostrollo" },
        { name: "Ma. Cristina V. Rostrollo" },
      ],
    },

    {
      title: "Ninong",
      icon: <Crown className="w-6 h-6 text-amber-600" />,
      members: [
        { name: "Francisco Rostrollo" },
        { name: "Ronan Cajigal" },
        { name: "Mario Ludovice" },
        { name: "Zannie Gamuyao" },
        { name: "Francis Baba" },
        { name: "Jimmy Caltino" },
        { name: "Orly Magano" },
        { name: "Jhune Sato" },
      ],
    },
    {
      title: "Ninang",
      icon: <Crown className="w-6 h-6 text-rose-500" />,
      members: [
        { name: "Merly Lendhart" },
        { name: "Amy Schenk" },
        { name: "Elena Ludovice" },
        { name: "Marife Rubas" },
        { name: "Rachel Rodriguez" },
        { name: "Menvyluz Macalalad" },
        { name: "Lalaine Sato" },
        { name: "Teresita Quaimbao" },
      ],
    },
    {
      title: "Groomsmen",
      icon: <LucideChessKing className="w-6 h-6 text-amber-600" />,
      members: [
        { name: "Jayson L. Gorospe" },
        { name: "Edan A. Belgica" },
        { name: "Clarence V. Rostrollo" },
        { name: "Ryan Kenneth C. Dayoc" },
        { name: "Jimwell G. Dacanay" },
        { name: "Aivan Cacho" },
        { name: "John Carlo Benjamin" },
      ],
    },
    {
      title: "Bridesmaids",
      icon: <LucideChessQueen className="w-6 h-6 text-rose-500" />,
      members: [
        { name: "Claire Andrea V. Rostrollo" },
        { name: "Charmaine V. Rostrollo" },
        { name: "Andrea E. Magano" },
        { name: "Mildred Q. Valdepeña" },
        { name: "Camille Airah V. Rostrollo" },
        { name: "Jovelyn D. Ocampo" },
        { name: "Ehryn Keisha M. Capitle" },
      ],
    },
    {
      title: "Candle",
      icon: <Flame className="w-6 h-6 text-orange-500" />,
      members: [
        { name: "Claire Andrea V. Rostrollo" },
        { name: "Jayson L. Gorospe" },
      ],
    },
    {
      title: "Veil",
      icon: <Eye className="w-6 h-6 text-purple-500" />,
      members: [
        { name: "Charmaine V. Rostrollo" },
        { name: "Edan A. Belgica" },
      ],
    },
    {
      title: "Cord",
      icon: <Link className="w-6 h-6 text-teal-600" />,
      members: [
        { name: "Andrea E. Magano" },
        { name: "Clarence V. Rostrollo" },
      ],
    },
    {
      title: "Bible Bearer",
      icon: <BookOpen className="w-6 h-6 text-blue-600" />,
      members: [{ name: "Lucas Jacob R. Magano" }],
    },
    {
      title: "Coin Bearer",
      icon: <Coins className="w-6 h-6 text-yellow-600" />,
      members: [{ name: "Zachary Kean R. Rostrollo" }],
    },
    {
      title: "Ring Bearer",
      icon: <LucideGem className="w-6 h-6 text-pink-500" />,
      members: [{ name: "Diego Joaquin R. Morales" }],
    },
    {
      title: "Here Comes the Bride",
      icon: <Sparkles className="w-6 h-6 text-fuchsia-500" />,
      members: [
        { name: "Liam Jaxon R. Magano" },
        { name: "Ezekiel Roman M. Capitle III" },
      ],
    },
    {
      title: "Flower Girls",
      icon: <Sparkles className="w-6 h-6 text-rose-400" />,
      members: [
        { name: "Andrea Alieza Abrielle M. Bato" },
        { name: "Anaya Mira G. Morales" },
        { name: "Luna Soleil U. Caltino" },
        { name: "Zianne Yssabelle C. Gamuyao" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[url('/bg.png')] bg-cover bg-center p-6">
      <div className="max-w-6xl mx-auto rounded-2xl shadow-xl p-8">
        <h1 className="text-4xl font-bold text-center text-indigo-900 mb-12">
          Wedding Entourage
        </h1>

        {sections.map((section, idx) => (
          <div key={idx} className="mb-12">
            <div className="flex items-center justify-center gap-3 mb-6">
              {section.icon}
              <h2 className="text-2xl font-semibold text-indigo-800">
                {section.title}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 place-items-center max-w-3xl mx-auto">
              {section.members.map((member, i) => (
                <div
                  key={i}
                  className={`w-full max-w-xs p-4 bg-white border rounded-xl shadow-sm text-center hover:shadow-md transition
        ${
          section.members.length === 1
            ? "sm:col-span-2 justify-self-center"
            : ""
        }
      `}
                >
                  <p className="font-semibold text-lg">{member.name}</p>
                  {member.role && (
                    <p className="text-sm text-gray-600 mt-1">{member.role}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
