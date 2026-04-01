import { useState, useEffect } from 'react'
import './App.css'

function App() {
    const [displayText, setDisplayText] = useState('')
    const [phase, setPhase] = useState(0)
    const [charIndex, setCharIndex] = useState(0)
    const [showSite, setShowSite] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const colors = {
        bg: '#0d1111',
        accent: '#45a198',
        text: '#ffffff',
    }

    const prefix = "いまは昔、竹取の"
    const oldWord = "翁"
    const newWord = "変人"
    const suffix = "といふもの有けり。"

    useEffect(() => {
        let timer: ReturnType<typeof setTimeout> | undefined;
        if (showSite) return;

        if (phase === 0) {
            const text0 = prefix + oldWord
            if (charIndex < text0.length) {
                timer = setTimeout(() => {
                    setDisplayText(text0.substring(0, charIndex + 1))
                    setCharIndex(charIndex + 1)
                }, 120)
            } else {
                timer = setTimeout(() => { setPhase(1); setCharIndex(0); }, 1500)
            }
        } else if (phase === 1) {
            if (displayText.includes(oldWord)) {
                timer = setTimeout(() => { setDisplayText(prefix) }, 600)
            } else {
                timer = setTimeout(() => setPhase(2), 500)
            }
        } else if (phase === 2) {
            if (charIndex < newWord.length) {
                timer = setTimeout(() => {
                    setDisplayText(prefix + newWord.substring(0, charIndex + 1))
                    setCharIndex(charIndex + 1)
                }, 150)
            } else {
                timer = setTimeout(() => { setPhase(3); setCharIndex(0); }, 1000)
            }
        } else if (phase === 3) {
            if (charIndex < suffix.length) {
                timer = setTimeout(() => {
                    setDisplayText(prefix + newWord + suffix.substring(0, charIndex + 1))
                    setCharIndex(charIndex + 1)
                }, 120)
            } else {
                timer = setTimeout(() => setShowSite(true), 1500)
            }
        }
        return () => clearTimeout(timer)
    }, [displayText, phase, charIndex, showSite])

    if (showSite) {
        return (
            <div className="notranslate" style={{
                backgroundColor: colors.bg,
                minHeight: '100vh',
                width: '100vw',
                margin: 0,
                padding: 0,
                overflowX: 'hidden',
                position: 'relative'
            }}>
                <style>{`
                  :root { background-color: ${colors.bg}; }
                  body { margin: 0 !important; padding: 0 !important; overflow-x: hidden !important; background-color: ${colors.bg} !important; width: 100vw; }
                  #root { margin: 0 !important; padding: 0 !important; width: 100% !important; max-width: none !important; }
                `}</style>

                {/* ハンバーガーアイコン */}
                <div onClick={() => setIsMenuOpen(!isMenuOpen)} style={{ position: 'fixed', top: '40px', right: '40px', zIndex: 1000, cursor: 'pointer', width: '30px', height: '12px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div style={{ width: '100%', height: '1px', backgroundColor: colors.accent, transition: '0.3s', transform: isMenuOpen ? 'translateY(5.5px) rotate(45deg)' : '' }}></div>
                    <div style={{ width: '100%', height: '1px', backgroundColor: colors.accent, transition: '0.3s', transform: isMenuOpen ? 'translateY(-5.5px) rotate(-45deg)' : '' }}></div>
                </div>

                {/* メニュー画面（一度だけ定義） */}
                <div style={{
                    position: 'fixed', top: 0, right: 0, width: '300px', height: '100%',
                    backgroundColor: '#131717', transition: '0.4s cubic-bezier(0.22, 1, 0.36, 1)',
                    transform: isMenuOpen ? 'translateX(0)' : 'translateX(100%)',
                    visibility: isMenuOpen ? 'visible' : 'hidden',
                    display: 'flex', flexDirection: 'column', padding: '100px 40px',
                    boxSizing: 'border-box', borderLeft: `1px solid ${colors.accent}33`,
                    zIndex: 900
                }}>
                    <nav style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                        {['HOME', 'WORKS', 'ABOUT', 'CONTACT'].map((item) => (
                            <a
                                key={item}
                                href={`#${item.toLowerCase()}`}
                                onClick={() => setIsMenuOpen(false)}
                                style={{
                                    fontSize: '1.2rem',
                                    color: item === 'CONTACT' ? colors.accent : colors.text,
                                    letterSpacing: '0.2em',
                                    textDecoration: 'none',
                                    transition: '0.3s',
                                    cursor: 'pointer'
                                }}
                            >
                                {item}
                            </a>
                        ))}
                    </nav>
                </div>

                {/* コンテンツ全体 */}
                <div style={{
                    width: '100%',
                    opacity: isMenuOpen ? 0.2 : 1,
                    filter: isMenuOpen ? 'blur(8px)' : 'none',
                    transition: '0.8s'
                }}>

                    {/* ヘッダー */}
                    <header style={{ padding: '80px 5% 0', borderLeft: `4px solid ${colors.accent}`, marginLeft: '5%', marginTop: '40px' }}>
                        <meta name="google-site-verification" content="aOxCXtJfHngm2jvkwZJ-bf0MtCzSJvhN8qgDT-HF6zg" />
                        <h1 style={{ fontSize: '2.2rem', letterSpacing: '0.5em', margin: 0, fontWeight: 700, color: colors.text }}>もの部</h1>
                    </header>

                    {/* メインヒーローエリア */}
                    <main style={{
                        display: 'flex',
                        flexDirection: window.innerWidth < 768 ? 'column' : 'row',
                        alignItems: 'center', // これでスマホ時に左右中央に寄る
                        justifyContent: 'center', // PC時に左右の余白を均等にする
                        padding: '60px 10%',
                        width: '100%',
                        boxSizing: 'border-box',
                        gap: '40px'
                    }}>
                        {/* 縦書きテキスト */}
                        <div style={{
                            writingMode: 'vertical-rl',
                            fontSize: window.innerWidth < 768 ? '1.1rem' : '1.4rem', // スマホでは少し小さく
                            color: colors.accent,
                            letterSpacing: '0.4em',
                            textOrientation: 'upright',
                            whiteSpace: 'nowrap',
                            height: window.innerWidth < 768 ? 'auto' : '400px' // スマホで高さが突き抜けないように
                        }}>
                            いまは昔、竹取の変人といふもの有けり。
                        </div>

                        {/* スペーサー（スマホでは消す） */}
                        {window.innerWidth >= 768 && <div style={{ flex: 1, minWidth: '40px' }}></div>}

                        <div style={{
                            display: 'flex',
                            flexDirection: window.innerWidth < 768 ? 'column' : 'row', // 中身もスマホで縦に
                            gap: '30px',
                            alignItems: 'center',
                            width: '100%',
                            maxWidth: '100%' // 絶対に突き抜けないように
                        }}>
                            {/* 動画エリア */}
                            <div style={{
                                width: '100%',
                                maxWidth: '480px',
                                margin: '0 auto', // これを追加！左右の隙間を自動で均等にする
                                borderRadius: '2px',
                                // ...その他のスタイル
                            }}>
                                <div style={{ paddingBottom: '56.25%', position: 'relative' }}>
                                    <iframe
                                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                                        src="https://www.youtube.com/embed?listType=user_uploads&list=UC5BlMT2DN_LjnpD9eLRqvsA"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            </div>

                            {/* ニュースエリア */}
                            <div style={{
                                width: window.innerWidth < 768 ? '100%' : '200px',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '20px'
                            }}>
                                <div style={{ borderLeft: `2px solid ${colors.accent}`, paddingLeft: '15px' }}>
                                    <div style={{ fontSize: '0.75rem', fontWeight: 'bold', marginBottom: '8px' }}>LATEST NEWS</div>
                                    <div style={{ fontSize: '0.7rem', color: '#889999', lineHeight: '1.8' }}>
                                        ・竹取プロジェクト始動<br />
                                        ・公式サイト開設
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>

                    {/* ABOUTセクション */}
                    <section id="about" style={{ padding: '80px 10%', backgroundColor: '#0a0d0d' }}>
                        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                            <div style={{ marginBottom: '40px', padding: '20px', borderLeft: `2px solid ${colors.accent}`, backgroundColor: '#131717', position: 'relative' }}>
                                <span style={{ fontSize: '0.6rem', color: colors.accent, position: 'absolute', top: '-10px', left: '10px', backgroundColor: colors.bg, padding: '0 5px' }}>SYSTEM MESSAGE</span>
                                <p style={{ margin: 0, fontSize: '0.9rem', color: colors.text, fontStyle: 'italic' }}>
                                    公式サイト：「なんか初投稿より先に僕が生まれちゃいました。」
                                </p>
                            </div>

                            <div style={{ color: '#b0b0b0', lineHeight: '2.2' }}>
                                <p>
                                    いまは昔、竹取の
                                    <span className="hover-change" data-hover="天才">変人</span>
                                    といふもの有けり。
                                </p>
                                <p>
                                    中学生5人くらいの何かつくるのが好きな
                                    <span className="hover-change" data-hover="天才">変人</span>
                                    集団です。
                                </p>
                                <p>
                                    主に
                                    <span className="hover-tips">
                                        竹<span className="tips-text">(最高級品)</span>
                                    </span>
                                    、CGアニメーションを扱っております。
                                </p>
                                <p style={{ fontSize: '0.9rem', marginTop: '20px' }}>
                                    学生なので、投稿頻度は多めに見といてください。
                                </p>
                            </div>
                            {/* メンバー紹介 */}
                            <div style={{ marginTop: '60px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
                                {[
                                    { id: '01', handle: 'シロモ', role: '部長', bio: 'こんにちは。変人中学生のシロモです。いつもCG、竹で様々なものをつくっております。このサイトをつくったのも私です。', color: colors.accent },
                                    { id: '02', handle: '米粒', role: 'メンバー', bio: '（自己紹介データ待機中：31日公開予定）', color: '#889999' },
                                    { id: '03', handle: 'スーパー少年', role: 'メンバー', bio: '（自己紹介データ待機中：31日公開予定）', color: '#b0b0b0' },
                                    { id: '04', handle: 'ほむ', role: 'メンバー', bio: '（自己紹介データ待機中：31日公開予定）', color: '#a34e4e' },
                                ].map((member) => (
                                    <div key={member.id} style={{ padding: '25px 20px', backgroundColor: '#0d1111', border: `1px solid ${member.color}33`, display: 'flex', flexDirection: 'column', gap: '12px', minHeight: '220px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <span style={{ fontWeight: 'bold', color: '#fff' }}>{member.handle}</span>
                                            <span style={{ fontSize: '0.6rem', color: member.color }}>NO.{member.id}</span>
                                        </div>
                                        <div style={{ fontSize: '0.6rem', color: member.color, border: `1px solid ${member.color}44`, padding: '2px 6px', alignSelf: 'start' }}>{member.role}</div>
                                        <div style={{ fontSize: '0.8rem', color: '#99aaaa', flexGrow: 1 }}>{member.bio}</div>
                                        <div style={{ fontSize: '0.5rem', color: '#445555' }}>STATUS: <span style={{ color: member.color }}>ACTIVE</span></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* CONTACT */}
                    <section id="contact" style={{ padding: '80px 10%', textAlign: 'center' }}>
                        <p style={{ color: '#889999', fontSize: '0.8rem', marginBottom: '20px' }}>直接のメッセージはこちらから</p>
                        <a href="https://discord.gg/72t2vrubny" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', padding: '12px 30px', color: '#fff', backgroundColor: '#5865F2', textDecoration: 'none', borderRadius: '4px', fontWeight: 'bold' }}>
                            Discordで連絡する
                        </a>
                    </section>
                </div>
            </div>
        );
    }

    // イントロ画面
    return (
        <div className="notranslate" style={{
            backgroundColor: '#000',
            color: '#fff',
            minHeight: '100vh',
            width: '100vw',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontFamily: 'serif',
            // スマホ(768px未満)なら1.5rem、PCなら2.5remにする
            fontSize: window.innerWidth < 768 ? '1.5rem' : '2.5rem',
            position: 'fixed',
            top: 0,
            left: 0,
            padding: '0 20px', // 画面端に文字がくっつかないように
            boxSizing: 'border-box',
            lineHeight: '1.5' // 行が重ならないように設定
        }}>
            <div style={{
                letterSpacing: '0.1em',
                textAlign: 'center', // スマホで万が一改行されても中央に
                wordBreak: 'break-all' // 変なところで切れないように
            }}>
                <span>{displayText}</span>
                <span style={{
                    display: 'inline-block',
                    width: '2px',
                    height: '1em',
                    backgroundColor: colors.accent,
                    marginLeft: '5px',
                    animation: 'blink 0.8s infinite',
                    verticalAlign: 'middle' // カーソルの位置を調整
                }}></span>
            </div>
            <style>{`
            body { margin: 0; overflow: hidden; background: #000; } 
            @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        `}</style>
        </div>
    );
}

export default App
