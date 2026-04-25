/**
 * @param {string} adapterName
 */
export function syncSnippetModeUi(adapterName) {
    const isOEPL = adapterName === 'OEPLAdapter';
    const isODP = adapterName === 'OpenDisplayAdapter';

    const oeplNotice = document.getElementById('oeplNotice');
    if (oeplNotice) oeplNotice.classList.toggle('hidden', !isOEPL);

    const odpNotice = document.getElementById('odpNotice');
    if (odpNotice) {
        odpNotice.classList.toggle('hidden', !isODP);
        if (isODP) {
            const noticeText = odpNotice.querySelector('div');
            if (noticeText) {
                noticeText.innerHTML = '<strong>OpenDisplay YAML (ODP)</strong> - Copy this to Home Assistant > Developer Tools > Actions > <code>opendisplay.drawcustom</code>';
            }
        }
    }

    const titleEl = document.querySelector('.code-panel-title');
    if (titleEl) {
        const button = titleEl.querySelector('button');
        titleEl.innerHTML = '';
        if (button) titleEl.appendChild(button);

        let titleText = ' ESPHome YAML';
        if (isOEPL) titleText = ' OpenEpaperLink JSON';
        if (isODP) titleText = ' OpenDisplay YAML (ODP)';

        titleEl.appendChild(document.createTextNode(titleText));
    }

    const copyOEPLBtn = document.getElementById('copyOEPLServiceBtn');
    if (copyOEPLBtn) copyOEPLBtn.style.display = isOEPL ? 'inline-block' : 'none';

    const copyODPBtn = document.getElementById('copyODPServiceBtn');
    if (copyODPBtn) copyODPBtn.style.display = isODP ? 'inline-block' : 'none';

    const copyLambdaBtn = document.getElementById('copyLambdaBtn');
    if (copyLambdaBtn) copyLambdaBtn.style.display = (isOEPL || isODP) ? 'none' : 'inline-block';

    const importBtn = document.getElementById('updateLayoutBtn');
    if (importBtn) importBtn.style.display = 'inline-block';

    return { isOEPL, isODP };
}
