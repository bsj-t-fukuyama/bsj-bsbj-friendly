import React, { useState, useEffect } from 'react';
import { Sparkles, RotateCcw, Plus, X, Save, UserPlus } from 'lucide-react';

// 初期の人物データ配列（Base64画像を使用）
const initialPeopleData = [
  {
    id: 1,
    name: '田中太郎',
    age: 28,
    position: 'フロントエンド開発者',
    goodAt: 'React.js, TypeScript',
    like: 'コーヒー、映画鑑賞',
    image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSI1MCIgZmlsbD0iIzMzNzNkYyIvPgogIDx0ZXh0IHg9IjUwJSIgeT0iNTUlIiBmb250LXNpemU9IjQwIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPvCfkanwn4+7PC90ZXh0Pgo8L3N2Zz4='
  },
  {
    id: 2,
    name: '佐藤花子',
    age: 32,
    position: 'UXデザイナー',
    goodAt: 'Figma, ユーザビリティ設計',
    like: 'アート、読書',
    image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSI1MCIgZmlsbD0iI2VjNDg5OSIvPgogIDx0ZXh0IHg9IjUwJSIgeT0iNTUlIiBmb250LXNpemU9IjQwIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPvCfkanwn46oPC90ZXh0Pgo8L3N2Zz4='
  },
  {
    id: 3,
    name: '鈴木次郎',
    age: 25,
    position: 'バックエンド開発者',
    goodAt: 'Node.js, データベース設計',
    like: 'ゲーム、プログラミング',
    image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSI1MCIgZmlsbD0iIzEwYjk4MSIvPgogIDx0ZXh0IHg9IjUwJSIgeT0iNTUlIiBmb250LXNpemU9IjQwIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPvCfkanwn5K8PC90ZXh0Pgo8L3N2Zz4='
  },
  {
    id: 4,
    name: '山田美咲',
    age: 29,
    position: 'プロダクトマネージャー',
    goodAt: 'プロジェクト管理, 戦略立案',
    like: 'ヨガ、旅行',
    image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSI1MCIgZmlsbD0iI2Y1OWUwYiIvPgogIDx0ZXh0IHg9IjUwJSIgeT0iNTUlIiBmb250LXNpemU9IjQwIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPvCfkanwn5K8PC90ZXh0Pgo8L3N2Zz4='
  },
  {
    id: 5,
    name: '高橋健',
    age: 35,
    position: 'データサイエンティスト',
    goodAt: 'Python, 機械学習',
    like: '数学、ランニング',
    image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSI1MCIgZmlsbD0iIzY2NjZkZCIvPgogIDx0ZXh0IHg9IjUwJSIgeT0iNTUlIiBmb250LXNpemU9IjQwIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPvCfkanwn5SLPC90ZXh0Pgo8L3N2Zz4='
  },
  {
    id: 6,
    name: '中村春香',
    age: 26,
    position: 'マーケティング',
    goodAt: 'SNS戦略, コンテンツ作成',
    like: '写真、カフェ巡り',
    image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSI1MCIgZmlsbD0iI2VmNDQ0NCIvPgogIDx0ZXh0IHg9IjUwJSIgeT0iNTUlIiBmb250LXNpemU9IjQwIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPvCfkanwn5K7PC90ZXh0Pgo8L3N2Zz4='
  }
];

// カードデータを作成（画像カードと情報カード）
const createCards = (peopleData) => {
  const cards = [];
  peopleData.forEach(person => {
    // 画像カード
    cards.push({
      id: `image-${person.id}`,
      type: 'image',
      personId: person.id,
      content: person.image,
      isFlipped: false,
      isMatched: false
    });
    // 情報カード
    cards.push({
      id: `info-${person.id}`,
      type: 'info',
      personId: person.id,
      content: person,
      isFlipped: false,
      isMatched: false
    });
  });
  
  // カードをシャッフル
  return cards.sort(() => Math.random() - 0.5);
};

const FaceMemoryGame = () => {
  const [peopleData, setPeopleData] = useState(initialPeopleData);
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [showMemberForm, setShowMemberForm] = useState(false);
  const [newMember, setNewMember] = useState({
    name: '',
    age: '',
    position: '',
    goodAt: '',
    like: '',
    image: ''
  });
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    if (gameStarted) {
      const newCards = createCards(peopleData);
      setCards(newCards);
      setFlippedCards([]);
      setMatchedPairs(0);
      setShowCelebration(false);
    }
  }, [peopleData, gameStarted]);

  const initializeGame = () => {
    const newCards = createCards(peopleData);
    setCards(newCards);
    setFlippedCards([]);
    setMatchedPairs(0);
    setShowCelebration(false);
    setGameStarted(true);
  };

  const handleCardClick = (cardIndex) => {
    if (flippedCards.length === 2) return;
    
    const card = cards[cardIndex];
    if (card.isFlipped || card.isMatched) return;

    const newCards = [...cards];
    newCards[cardIndex].isFlipped = true;
    setCards(newCards);

    const newFlippedCards = [...flippedCards, cardIndex];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setTimeout(() => {
        checkMatch(newFlippedCards);
      }, 1000);
    }
  };

  const checkMatch = (flippedIndexes) => {
    const [first, second] = flippedIndexes;
    const firstCard = cards[first];
    const secondCard = cards[second];

    if (firstCard.personId === secondCard.personId) {
      // マッチした場合
      const newCards = [...cards];
      newCards[first].isMatched = true;
      newCards[second].isMatched = true;
      setCards(newCards);
      setMatchedPairs(prev => prev + 1);
      
      // お祝いアニメーション
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 2000);
      
      // ゲーム終了チェック
      if (matchedPairs + 1 === peopleData.length) {
        setTimeout(() => {
          alert('🎉 おめでとうございます！全ペア見つけました！恭喜！');
        }, 2000);
      }
    } else {
      // マッチしなかった場合
      const newCards = [...cards];
      newCards[first].isFlipped = false;
      newCards[second].isFlipped = false;
      setCards(newCards);
    }

    setFlippedCards([]);
  };

  const resetGame = () => {
    initializeGame();
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      // ファイルサイズチェック（5MB制限）
      if (file.size > 5 * 1024 * 1024) {
        alert('ファイルサイズは5MB以下にしてください');
        return;
      }

      // 画像ファイルかチェック
      if (!file.type.startsWith('image/')) {
        alert('画像ファイルを選択してください');
        return;
      }

      setSelectedFile(file);
      
      // Base64に変換
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64Image = event.target.result;
        setNewMember({...newMember, image: base64Image});
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddMember = () => {
    if (!newMember.name || !newMember.age || !newMember.position || !newMember.image) {
      alert('名前、年齢、職種、画像は必須項目です');
      return;
    }

    const newId = Math.max(...peopleData.map(p => p.id), 0) + 1;
    const memberToAdd = {
      ...newMember,
      id: newId,
      age: parseInt(newMember.age)
    };

    setPeopleData(prev => [...prev, memberToAdd]);
    
    // フォームリセット
    setNewMember({
      name: '',
      age: '',
      position: '',
      goodAt: '',
      like: '',
      image: ''
    });
    setSelectedFile(null);
    setShowMemberForm(false);
    
    // ゲーム中なら自動的にリセット
    if (gameStarted) {
      setTimeout(() => {
        initializeGame();
      }, 500);
    }
  };

  const handleDeleteMember = (id) => {
    if (window.confirm('このメンバーを削除しますか？')) {
      setPeopleData(prev => prev.filter(p => p.id !== id));
      if (gameStarted) {
        setTimeout(() => {
          initializeGame();
        }, 500);
      }
    }
  };

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-400 to-pink-400 p-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">顔-特徴一致神経衰弱</h1>
            <p className="text-white text-lg mb-8">現在のメンバー数: {peopleData.length}人</p>
            <button
              onClick={initializeGame}
              className="px-8 py-4 bg-white text-purple-600 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors mr-4"
            >
              ゲーム開始
            </button>
            <button
              onClick={() => setShowMemberForm(true)}
              className="px-8 py-4 bg-green-500 text-white rounded-lg font-bold text-lg hover:bg-green-600 transition-colors"
            >
              <UserPlus className="inline mr-2" size={20} />
              メンバー追加
            </button>
          </div>

          {/* メンバー一覧 */}
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">メンバー一覧</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {peopleData.map(person => (
                <div key={person.id} className="bg-gray-50 rounded-lg p-4 relative">
                  <button
                    onClick={() => handleDeleteMember(person.id)}
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                  >
                    <X size={20} />
                  </button>
                  <div className="flex items-center gap-4">
                    <img
                      src={person.image}
                      alt={person.name}
                      className="w-16 h-16 rounded-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div 
                      className="w-16 h-16 rounded-full bg-gray-300 items-center justify-center text-gray-600 hidden"
                      style={{ display: 'none' }}
                    >
                      👤
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-800">{person.name}</h3>
                      <p className="text-sm text-gray-600">{person.age}歳 • {person.position}</p>
                      <p className="text-xs text-gray-500 mt-1">得意: {person.goodAt}</p>
                      <p className="text-xs text-gray-500">好き: {person.like}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* メンバー追加フォーム */}
        {showMemberForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">新しいメンバーを追加</h3>
                <button
                  onClick={() => setShowMemberForm(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">名前 *</label>
                  <input
                    type="text"
                    value={newMember.name}
                    onChange={(e) => setNewMember({...newMember, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="田中太郎"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">年齢 *</label>
                  <input
                    type="number"
                    value={newMember.age}
                    onChange={(e) => setNewMember({...newMember, age: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="28"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">職種・ポジション *</label>
                  <input
                    type="text"
                    value={newMember.position}
                    onChange={(e) => setNewMember({...newMember, position: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="フロントエンド開発者"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">得意なこと</label>
                  <input
                    type="text"
                    value={newMember.goodAt}
                    onChange={(e) => setNewMember({...newMember, goodAt: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="React.js, TypeScript"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">好きなもの</label>
                  <input
                    type="text"
                    value={newMember.like}
                    onChange={(e) => setNewMember({...newMember, like: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="コーヒー、映画鑑賞"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">画像ファイル *</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">JPG, PNG, GIF対応（5MB以下）</p>
                </div>
                
                {newMember.image && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-600 mb-2">画像プレビュー:</p>
                    <img
                      src={newMember.image}
                      alt="プレビュー"
                      className="w-20 h-20 rounded-full object-cover border-2 border-gray-300"
                    />
                    {selectedFile && (
                      <p className="text-xs text-gray-500 mt-1">
                        ファイル名: {selectedFile.name} ({(selectedFile.size / 1024).toFixed(1)}KB)
                      </p>
                    )}
                  </div>
                )}
              </div>
              
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowMemberForm(false)}
                  className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
                >
                  キャンセル
                </button>
                <button
                  onClick={handleAddMember}
                  className="flex-1 px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors"
                >
                  <Save className="inline mr-2" size={16} />
                  追加
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 to-pink-400 p-4">
      {/* ヘッダー */}
      <div className="max-w-6xl mx-auto mb-6">
        <div className="flex justify-between items-center bg-white rounded-lg p-4 shadow-lg">
          <h1 className="text-2xl font-bold text-gray-800">顔-特徴一致神経衰弱</h1>
          <div className="flex items-center gap-4">
            <span className="text-lg font-semibold text-gray-700">
              見つけたペア: {matchedPairs} / {peopleData.length}
            </span>
            <button
              onClick={() => setGameStarted(false)}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              <UserPlus size={20} className="inline mr-2" />
              メンバー管理
            </button>
            <button
              onClick={resetGame}
              className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
            >
              <RotateCcw size={20} />
              リセット
            </button>
          </div>
        </div>
      </div>

      {/* ゲームボード */}
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-3">
          {cards.map((card, index) => (
            <div
              key={card.id}
              onClick={() => handleCardClick(index)}
              className={`aspect-square cursor-pointer transition-all duration-500 transform hover:scale-105 ${
                card.isMatched ? 'opacity-0 pointer-events-none' : ''
              }`}
            >
              <div className={`w-full h-full rounded-lg shadow-lg transition-transform duration-500 ${
                card.isFlipped ? 'rotate-y-180' : ''
              }`}>
                {/* カード裏面 */}
                <div className={`absolute inset-0 backface-hidden ${
                  card.isFlipped ? 'opacity-0' : 'opacity-100'
                }`}>
                  <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <div className="text-white text-2xl">🎴</div>
                  </div>
                </div>
                
                {/* カード表面 */}
                <div className={`absolute inset-0 backface-hidden ${
                  card.isFlipped ? 'opacity-100' : 'opacity-0'
                }`}>
                  {card.type === 'image' ? (
                    // 画像カード
                    <div className="w-full h-full bg-white rounded-lg flex items-center justify-center shadow-lg overflow-hidden">
                      <img
                        src={card.content}
                        alt="メンバー"
                        className="w-full h-full object-cover rounded-lg"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                      <div className="w-full h-full bg-gray-200 items-center justify-center text-4xl hidden">
                        👤
                      </div>
                    </div>
                  ) : (
                    // 情報カード
                    <div className="w-full h-full bg-white rounded-lg p-2 shadow-lg overflow-hidden">
                      <div className="text-xs leading-tight h-full flex flex-col justify-center">
                        <div className="font-bold text-purple-600 mb-1 text-center">{card.content.name}</div>
                        <div className="text-gray-600 mb-1 text-center">{card.content.age}歳</div>
                        <div className="text-gray-700 font-semibold mb-1 text-[10px] text-center">{card.content.position}</div>
                        <div className="text-gray-600 mb-1 text-[9px] text-center">得意: {card.content.goodAt}</div>
                        <div className="text-gray-600 text-[9px] text-center">好き: {card.content.like}</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* お祝いアニメーション */}
      {showCelebration && (
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50">
          <div className="bg-white rounded-lg p-8 shadow-2xl animate-bounce">
            <div className="flex items-center gap-3 text-2xl font-bold text-purple-600">
              <Sparkles className="animate-spin" />
              <span>おめでとう！恭喜！</span>
              <Sparkles className="animate-spin" />
            </div>
          </div>
        </div>
      )}

      {/* ゲーム説明 */}
      <div className="max-w-6xl mx-auto mt-6">
        <div className="bg-white rounded-lg p-4 shadow-lg">
          <h3 className="font-bold text-gray-800 mb-2">遊び方</h3>
          <p className="text-gray-600 text-sm">
            カードを2枚選んで、同じ人物の「顔写真」と「情報」のペアを見つけましょう！
            ペアが見つかるとカードが消えます。全てのペアを見つけてゲームクリアを目指しましょう。
          </p>
        </div>
      </div>
    </div>
  );
};

export default FaceMemoryGame;