import 'aplayer/dist/APlayer.min.css';
import APlayer from 'aplayer';

export const ap = new APlayer({
    container: document.getElementById('aplayer'),
    fixed: true,
    autoplay: true,
    loop: 'one',
    audio: [
        {
            name: '嘉然我想对你说',
            artist: 'Kkkengar',
            url: 'https://cloud.aili.moe/api/name/嘉然我想对你说.aac?path=/💌写给嘉然的歌/Kkkengar%20-%20嘉然我想对你说.aac',
            cover: 'https://cdn.jsdelivr.net/gh/starlight02/assets@main/images/diana_logo.png',
        },
    ],
});
